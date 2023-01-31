import { useDispatch } from 'react-redux';
import { fireStoreActions } from '../store/fireStoreSlice';
import { appFireStore, timestamp } from '../firebase/config';
import {
	DocumentData,
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';

const useFireStore = (transaction: string) => {
	const dispatch = useDispatch();

	const colRef = collection(appFireStore, transaction);

	const addDocument = async (doc: DocumentData) => {
		dispatch(fireStoreActions.isPending());
		try {
			const createdTime = timestamp.fromDate(new Date());
			const docRef = await addDoc(colRef, { ...doc, createdTime });
			dispatch(fireStoreActions.addDoc(docRef));
		} catch (error: any) {
			dispatch(fireStoreActions.error(error.message));
		}
	};

	const delDocument = async (id: string) => {
		dispatch(fireStoreActions.isPending());
		try {
			const docRef = await deleteDoc(doc(colRef, id));
			dispatch(fireStoreActions.deleteDoc(docRef));
		} catch (error: any) {
			dispatch(fireStoreActions.error(error.message));
		}
	};

	const updateDocument = async (id: string, content: object) => {
		dispatch(fireStoreActions.isPending());
		try {
			const docRef = await updateDoc(doc(colRef, id), { ...content });
			dispatch(fireStoreActions.updateDoc(docRef));
		} catch (error: any) {
			dispatch(fireStoreActions.error(error.message));
		}
	};
	return { addDocument, delDocument, updateDocument };
};

export default useFireStore;
