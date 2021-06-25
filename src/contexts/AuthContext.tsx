import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
	id: string;
	name: string;
	avatar: string;
};

type AuthContextType = {
	user: User | undefined;
	SignInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				const { displayName, photoURL, uid } = user;

				if (!displayName || !photoURL) {
					throw new Error('Missing information from Google Account!');
				}

				setUser({
					id: uid,
					name: displayName,
					avatar: photoURL,
				});
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	async function SignInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();
		const dataUser = await auth.signInWithPopup(provider);

		if (dataUser.user) {
			const { displayName, photoURL, uid } = dataUser.user;

			if (!displayName || !photoURL) {
				throw new Error('Missing information from Google Account!');
			}

			setUser({
				id: uid,
				name: displayName,
				avatar: photoURL,
			});
		}
	}
	return (
		<AuthContext.Provider value={{ user, SignInWithGoogle }}>
			{props.children}
		</AuthContext.Provider>
	);
}