// import Array "mo:base/Array";

// actor {
//   stable var students : [Student] = [];
//   stable var courses : [Course] = [];
//   stable var studentCourses : [(Text, Course)] = [];

//   public type Student = {
//     firstName : Text;
//     lastName : Text;
//     school : Text;
//   };

//   public type Course = {
//     courseId : Text;
//     courseName : Text;
//   };

//   public query func getStudents() : async [Student] {
//     return students;
//   };

//   public query func getCourses() : async [Course] {
//     return courses;
//   };

//   public func addStudent(firstName : Text, lastName : Text, school : Text) : async () {
//     let newStudent : [Student] = [{ firstName; lastName; school }];
//     students := Array.append(students, newStudent);
//   };

//   public func addCourse(courseId : Text, courseName : Text) : async () {
//     let newCourse : [Course] = [{ courseId; courseName }];
//     courses := Array.append(courses, newCourse);
//   };

//   public func assignCourseToStudent(studentId : Text, courseId : Text) : async () {
//     let courseOpt = Array.find<Course>(
//       courses,
//       func(c : Course) : Bool {
//         c.courseId == courseId;
//       },
//     );

//     switch (courseOpt) {
//       case (?course) {
//         studentCourses := Array.append(studentCourses, [(studentId, course)]);
//       };
//       case (null) {
//         // Handle course not found
//       };
//     };
//   };

//   public query func getStudentCourses(studentId : Text) : async [Course] {
//     let studentCoursesList : [Course] = Array.map<(Text, Course), Course>(
//       Array.filter<(Text, Course)>(
//         studentCourses,
//         func((sId, _)) : Bool {
//           sId == studentId;
//         },
//       ),
//       func((_, course)) : Course {
//         course;
//       },
//     );
//     return studentCoursesList;
//   };
// };
















// import Array "mo:base/Array";

// actor {
//   stable var members : [Member] = [];
//   stable var claims : [Claim] = [];
//   stable var memberClaims : [(Text, Claim)] = [];

//   public type Member = {
//     firstName : Text;
//     lastName : Text;
//     address : Text;
//     contact: Text;
//   };

//   public type Claim = {
//     claimId : Text;
//     claimName : Text;
//   };

//   public query func getMembers() : async [Member] {
//     return members;
//   };

//   public query func getClaims() : async [Claim] {
//     return claims;
//   };

//   public func addMember(firstName : Text, lastName : Text, address : Text, contact : Text) : async () {
//     let newMember : [Member] = [{ firstName; lastName; address; contact }];
//     members := Array.append(members, newMember);
//   };

//   public func addClaim(claimId : Text, claimName : Text) : async () {
//     let newClaim : [Claim] = [{ claimId; claimName }];
//     claims := Array.append(claims, newClaim);
//   };

//   public func assignClaimToMember(memberId : Text, claimId : Text) : async () {
//     let claimOpt = Array.find<Claim>(
//       claims,
//       func(c : Claim) : Bool {
//         c.claimId == claimId;
//       },
//     );

//     switch (claimOpt) {
//       case (?claim) {
//         memberClaims := Array.append(memberClaims, [(memberId, claim)]);
//       };
//       case (null) {
//         // Handle claim not found
//       };
//     };
//   };

//   public query func getMemberClaims(memberId : Text) : async [Claim] {
//     let memberClaimsList : [Claim] = Array.map<(Text, Claim), Claim>(
//       Array.filter<(Text, Claim)>(
//         memberClaims,
//         func((sId, _)) : Bool {
//           sId == memberId;
//         },
//       ),
//       func((_, claim)) : Claim {
//         claim;
//       },
//     );
//     return memberClaimsList;
//   };
// };
























import Array "mo:base/Array";

actor {
  stable var members : [Member] = [];
  stable var claims : [Claim] = [];
  stable var memberClaims : [(Text, Claim)] = [];

  public type Member = {
    firstName : Text;
    lastName : Text;
    address : Text;
    contact: Text;
  };

  public type Claim = {
    claimId : Text;
    claimName : Text;
  };

  public query func getMembers() : async [Member] {
    return members;
  };

  public query func getClaims() : async [Claim] {
    return claims;
  };

  public func addMember(firstName : Text, lastName : Text, address : Text, contact : Text) : async () {
    let newMember : Member = { firstName; lastName; address; contact };
    members := Array.append(members, [newMember]);
  };

  public func addClaim(claimId : Text, claimName : Text) : async () {
    let newClaim : Claim = { claimId; claimName };
    claims := Array.append(claims, [newClaim]);
  };

  public func assignClaimToMember(memberId : Text, claimId : Text) : async () {
    let claimOpt = Array.find<Claim>(
      claims,
      func(c : Claim) : Bool {
        c.claimId == claimId;
      },
    );

    switch (claimOpt) {
      case (?claim) {
        memberClaims := Array.append(memberClaims, [(memberId, claim)]);
      };
      case (null) {
        // Handle claim not found
      };
    };
  };

  public query func getMemberClaims(memberId : Text) : async [Claim] {
    let memberClaimsList : [Claim] = Array.map<(Text, Claim), Claim>(
      Array.filter<(Text, Claim)>(
        memberClaims,
        func((sId, _)) : Bool {
          sId == memberId;
        },
      ),
      func((_, claim)) : Claim {
        claim;
      },
    );
    return memberClaimsList;
  };
};






























