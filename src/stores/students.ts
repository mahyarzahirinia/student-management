import { ref } from "vue";
import { defineStore } from "pinia";
import { initStudents, type Student } from "./studentsData";

export const useStudentsStore = defineStore(
  "studentsStore",
  () => {
    const students = ref<Student[]>(initStudents);

    function edit(updatedStudent: Student) {
      const studentIndex = students.value.findIndex(
        (stu) => stu.id === updatedStudent.id,
      );
      if (studentIndex !== -1) {
        Object.assign(students.value[studentIndex], updatedStudent);
      }
    }

    function add(newStudent: Student) {
      debugger;
      students.value.push(newStudent);
    }

    function remove(id: string) {
      debugger;
      const index = students.value.findIndex(
        (student) => student.studentId === id,
      );
      if (index !== -1) {
        students.value.splice(index, 1);
      }
    }

    function reset() {
      students.value.length = 0;
      students.value.push(...initStudents);
    }

    return { students, edit, add, remove, reset };
  },
  {
    persist: {
      storage: localStorage,
      key: "students",
    },
  },
);
