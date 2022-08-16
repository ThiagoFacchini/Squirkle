export default interface UserDetailsType {
    isLogged: boolean;
    username: string | null;
    authToken: string | number | null;
}