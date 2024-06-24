import Debug "mo:base/Debug";

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

    type Claim = {
        id: Nat;
        patientId: Nat;
        doctorId: Nat;
        amount: Nat;
        status: Text;
    };

    stable var patients: [Patient] = [];
    stable var doctors: [Doctor] = [];
    stable var insurances: [Insurance] = [];
    stable var claims: [Claim] = [];

    public func createPatient(patient: Patient): async () {
        patients := Array.append(patients, [patient]);
    };

    public func readPatients(): async [Patient] {
        return patients;
    };

    public func createDoctor(doctor: Doctor): async () {
        doctors := Array.append(doctors, [doctor]);
    };

    public func readDoctors(): async [Doctor] {
        return doctors;
    };

    public func createInsurance(insurance: Insurance): async () {
        insurances := Array.append(insurances, [insurance]);
    };

    public func readInsurances(): async [Insurance] {
        return insurances;
    };

    public func createClaim(claim: Claim): async () {
        claims := Array.append(claims, [claim]);
    };

    public func readClaims(): async [Claim] {
        return claims;
    };
};
