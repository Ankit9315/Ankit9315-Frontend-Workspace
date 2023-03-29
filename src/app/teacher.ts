import { Student } from "./student";
import { StudentTeacher } from "./student-teacher";

export class Teacher {
    [x: string]: any;

    id:number;
    teacheruuid:String;
    first_name:String;
    last_name:String;
    gender:String;
    mobilenumber:String;
    email:String;
    stuteachrelation:StudentTeacher[];
}
