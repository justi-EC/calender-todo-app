import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { appAuth } from '../firebase/config';
import { authActions } from '../store/authSlice';

const useLogout = () => {
	const dispatch = useDispatch();

	const logout = async () => {
		try {
			const res = await signOut(appAuth);
			dispatch(authActions.logout());
		} catch (error: any) {
			throw new Error('로그아웃에 실패했습니다.');
		}
	};

	return { logout };
};

export default useLogout;
