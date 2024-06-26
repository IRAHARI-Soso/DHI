import Debug "mo:base/Debug";
import Array "mo:base/Array";

actor DecentralizedHealthInsurance {
    type Patient = {
        id: Nat;
        name: Text;
        age: Nat;
        insuranceNumber: Text;
    };

    type Doctor = {
        id: Nat;
        name: Text;
        specialty: Text;
    };

    type Insurance = {
        id: Nat;
        name: Text;
        coverageDetails: Text;
    };

    type User = {
        id: Nat;
        username: Text;
        password: Text;
        role: Text;
    };

    stable var patients: [Patient] = [];
    stable var doctors: [Doctor] = [];
    stable var insurances: [Insurance] = [];
    stable var users: [User] = [];

    public func createPatient(patient: Patient): async () {
        patients := Array.push<Patient>(patients, patient);
    };

    public func readPatients(): async [Patient] {
        return patients;
    };

    public func createDoctor(doctor: Doctor): async () {
        doctors := Array.push<Doctor>(doctors, doctor);
    };

    public func readDoctors(): async [Doctor] {
        return doctors;
    };

    public func createInsurance(insurance: Insurance): async () {
        insurances := Array.push<Insurance>(insurances, insurance);
    };

    public func readInsurances(): async [Insurance] {
        return insurances;
    };

    public func createUser(user: User): async () {
        users := Array.push<User>(users, user);
    };

    public func login(username: Text, password: Text): async ?User {
        for (user in users.vals()) {
            if (user.username == username and user.password == password) {
                return ?user;
            }
        };
        return null;
    };

    public func readUsers(): async [User] {
        return users;
    };
};

// Example usage of Array
let arr: [Nat] = Array.init<Nat>(5, func (i: Nat) : Nat { i });
Debug.print(debug_show(arr));
