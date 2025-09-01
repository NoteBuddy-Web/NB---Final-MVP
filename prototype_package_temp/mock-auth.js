// Mock Authentication System for Local Development
// This simulates Firebase authentication for testing purposes

class MockAuth {
    constructor() {
        this.currentUser = null;
        this.authStateListeners = [];
        this.isInitialized = false;
    }

    initialize() {
        this.isInitialized = true;
        console.log('Mock Firebase Auth initialized for local development');
        
        // Check if user is already signed in (from localStorage)
        const savedUser = localStorage.getItem('mockAuthUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.notifyAuthStateChange(this.currentUser);
        }
    }

    onAuthStateChanged(callback) {
        this.authStateListeners.push(callback);
        // Immediately call with current state
        if (this.isInitialized) {
            callback(this.currentUser);
        }
        return () => {
            const index = this.authStateListeners.indexOf(callback);
            if (index > -1) {
                this.authStateListeners.splice(index, 1);
            }
        };
    }

    signInWithPopup(provider) {
        return new Promise((resolve, reject) => {
            if (provider.providerId === 'google.com') {
                // Simulate Google sign-in
                const mockUser = {
                    uid: 'mock-google-user-' + Date.now(),
                    email: 'user@gmail.com',
                    displayName: 'Test User',
                    photoURL: null,
                    providerData: [{ providerId: 'google.com' }]
                };
                
                this.currentUser = mockUser;
                localStorage.setItem('mockAuthUser', JSON.stringify(mockUser));
                this.notifyAuthStateChange(mockUser);
                
                resolve({ user: mockUser });
            } else {
                reject(new Error('Unsupported provider'));
            }
        });
    }

    signInWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            if (email && password) {
                const mockUser = {
                    uid: 'mock-email-user-' + Date.now(),
                    email: email,
                    displayName: email.split('@')[0],
                    photoURL: null,
                    providerData: [{ providerId: 'password' }]
                };
                
                this.currentUser = mockUser;
                localStorage.setItem('mockAuthUser', JSON.stringify(mockUser));
                this.notifyAuthStateChange(mockUser);
                
                resolve({ user: mockUser });
            } else {
                reject(new Error('Invalid email or password'));
            }
        });
    }

    createUserWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            if (email && password && password.length >= 6) {
                const mockUser = {
                    uid: 'mock-new-user-' + Date.now(),
                    email: email,
                    displayName: email.split('@')[0],
                    photoURL: null,
                    providerData: [{ providerId: 'password' }]
                };
                
                this.currentUser = mockUser;
                localStorage.setItem('mockAuthUser', JSON.stringify(mockUser));
                this.notifyAuthStateChange(mockUser);
                
                resolve({ user: mockUser });
            } else {
                reject(new Error('Invalid email or password'));
            }
        });
    }

    signOut() {
        return new Promise((resolve) => {
            this.currentUser = null;
            localStorage.removeItem('mockAuthUser');
            this.notifyAuthStateChange(null);
            resolve();
        });
    }

    notifyAuthStateChange(user) {
        this.authStateListeners.forEach(callback => {
            try {
                callback(user);
            } catch (error) {
                console.error('Error in auth state listener:', error);
            }
        });
    }
}

// Mock Google Auth Provider
class MockGoogleAuthProvider {
    constructor() {
        this.providerId = 'google.com';
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MockAuth, MockGoogleAuthProvider };
} else {
    window.MockAuth = MockAuth;
    window.MockGoogleAuthProvider = MockGoogleAuthProvider;
}
