import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocFromServer,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  type Timestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

let connectionTested = false;
export async function testFirestoreConnection(): Promise<void> {
  if (connectionTested) return;
  connectionTested = true;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration: client is offline.');
    }
  }
}

export type ApplicationStatus = 'submitted' | 'reviewing' | 'contacted' | 'archived';
export type InquiryStatus = 'new' | 'responded' | 'archived';

export interface DriverApplicationInput {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  zipCode: string;
  cdlClass: 'A' | 'B' | 'Other';
  cdlState: string;
  yearsExperience: 'Less than 1 year' | '1-2 years' | '3-5 years' | '6-10 years' | '10+ years';
  endorsements: string[];
  drivingRecordNotes?: string;
  preferredDrivingType:
    | 'Local'
    | 'Regional'
    | 'OTR'
    | 'Dedicated'
    | 'Owner-Operator'
    | 'Open to Opportunities';
  preferredEmploymentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Flexible';
  currentlyEmployed: 'Yes' | 'No' | 'Prefer not to say';
  availableStartDate: 'Immediately' | 'Within 2 weeks' | 'Within 30 days' | 'Flexible / Exploring';
  additionalComments?: string;
  privacyConsent: boolean;
  sourceOpportunity?: string;
}

export interface StoredDriverApplication extends DriverApplicationInput {
  id: string;
  status: ApplicationStatus;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface ContactInquiryInput {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface StoredContactInquiry extends ContactInquiryInput {
  id: string;
  status: InquiryStatus;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

function generateDocumentId(prefix: string): string {
  const randomPart =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 12)
      : Math.random().toString(36).slice(2, 14);
  return `${prefix}_${Date.now()}_${randomPart}`;
}

export async function submitDriverApplication(
  input: DriverApplicationInput
): Promise<{ applicationId: string }> {
  const applicationId = generateDocumentId('app');
  const path = `driverApplications/${applicationId}`;

  const payload: Record<string, unknown> = {
    fullName: input.fullName.trim().slice(0, 120),
    phone: input.phone.trim().slice(0, 30),
    email: input.email.trim().toLowerCase().slice(0, 160),
    city: input.city.trim().slice(0, 80),
    state: input.state.trim().slice(0, 40),
    zipCode: input.zipCode.trim().slice(0, 12),
    cdlClass: input.cdlClass,
    cdlState: input.cdlState.trim().slice(0, 40),
    yearsExperience: input.yearsExperience,
    endorsements: input.endorsements.slice(0, 10).map((e) => String(e).slice(0, 40)),
    preferredDrivingType: input.preferredDrivingType,
    preferredEmploymentType: input.preferredEmploymentType,
    currentlyEmployed: input.currentlyEmployed,
    availableStartDate: input.availableStartDate,
    privacyConsent: Boolean(input.privacyConsent),
    status: 'submitted',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const trimmedRecordNotes = input.drivingRecordNotes?.trim().slice(0, 500);
  if (trimmedRecordNotes) {
    payload.drivingRecordNotes = trimmedRecordNotes;
  }

  const trimmedComments = input.additionalComments?.trim().slice(0, 1500);
  if (trimmedComments) {
    payload.additionalComments = trimmedComments;
  }

  const trimmedSource = input.sourceOpportunity?.trim().slice(0, 80);
  if (trimmedSource) {
    payload.sourceOpportunity = trimmedSource;
  }

  try {
    await setDoc(doc(db, 'driverApplications', applicationId), payload);
    return { applicationId };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function submitContactInquiry(
  input: ContactInquiryInput
): Promise<{ inquiryId: string }> {
  const inquiryId = generateDocumentId('inq');
  const path = `contactInquiries/${inquiryId}`;

  const payload = {
    fullName: input.fullName.trim().slice(0, 120),
    phone: input.phone.trim().slice(0, 30),
    email: input.email.trim().toLowerCase().slice(0, 160),
    subject: input.subject.trim().slice(0, 160),
    message: input.message.trim().slice(0, 2000),
    status: 'new',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, 'contactInquiries', inquiryId), payload);
    return { inquiryId };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function signInAdminWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutAdmin(): Promise<void> {
  await signOut(auth);
}

export async function fetchDriverApplications(): Promise<StoredDriverApplication[]> {
  const path = 'driverApplications';
  try {
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<StoredDriverApplication, 'id'>),
    }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function updateDriverApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
): Promise<void> {
  const path = `driverApplications/${applicationId}`;
  try {
    await updateDoc(doc(db, 'driverApplications', applicationId), {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function fetchContactInquiries(): Promise<StoredContactInquiry[]> {
  const path = 'contactInquiries';
  try {
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<StoredContactInquiry, 'id'>),
    }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function updateContactInquiryStatus(
  inquiryId: string,
  status: InquiryStatus
): Promise<void> {
  const path = `contactInquiries/${inquiryId}`;
  try {
    await updateDoc(doc(db, 'contactInquiries', inquiryId), {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}
