
export class LoginModel {
  email: string = '';
  password: string = '';
}



// export class EmployeeModel {
//   id?: number;
//   name?: string;
//   // department?: string;
//   status: string = '';
//   search: string = '';
//   page: number = 1;
//   pageSize: number = 10;
//    job: {
//     department?: string;
//   } = { department: "" };  
// }


export class EmployeeModel {
  id: number = 0;
  name: string = '';
  department?: string = '';
  status: string = '';
  search: string = '';
  page: number = 1;
  pageSize: number = 10;
}



export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface Contact {
  email: string;
  phone: string;
  address: Address;
}

export interface Personal {
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  dob: string;
  image: string;
}

export interface Job {
  department: string;
  position: string;
  dateJoined: string;
  salary: number;
  managerId: number | null;
}

export interface Employee {
  id?: number;
  personal: Personal;
  contact: Contact;
  job: Job;
  status: 'Pending' | 'Approved' | 'Rejected';
  permissions: string[];
  logs: { action: string; date: string }[];
}












// export interface Address {
//   street: string;
//   city: string;
//   country: string;
// }

// export interface Personal {
//   firstName: string;
//   lastName: string;
//   fullName: string;
//   gender: string;
//   dob: string;
//   image: string;
// }

// export interface Contact {
//   email: string;
//   phone: string;
//   address: Address;
// }

// export interface Job {
//   department: string;
//   position: string;
//   dateJoined: string;
//   salary: number;
//   managerId: number | null;
// }

// export interface LogEntry {
//   action: string;
//   date: string;
// }

// export interface EmployeeModel {
//   id: number;
//   personal: Personal;
//   contact: Contact;
//   job: Job;
//   status: string;
//   permissions: string[];
//   logs: LogEntry[];
// }



