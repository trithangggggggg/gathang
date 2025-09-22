import type { Student } from "../utils/types";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import Toolbar from "../components/Toolbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const StudentManagement = () => {
  const [toggle, setToggle] = useState<string>(""); // "" = ẩn, "on" = thêm, "edit" = sửa
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const students = useSelector((store: any) => store.student);
  const dispatch = useDispatch();

  // Thêm sinh viên
  const handleAddStudent = (student: Student) => {
    dispatch({ type: "ADD", payload: student });
  };

  // Sửa sinh viên
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setToggle("edit");
  };

  // Cập nhật sinh viên sau khi sửa
  const handleUpdateStudent = (student: Student) => {
    dispatch({ type: "EDIT", payload: student });
    setEditingStudent(null);
    setToggle("");
  };

  // Xóa sinh viên
  const handleDeleteStudent = (id: string) => {
    dispatch({ type: "DELETE", payload: { id } });
  };

  // Tìm kiếm sinh viên
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword.toLowerCase());
  };

  // Lọc danh sách sinh viên theo từ khóa
  const filteredStudents = students.filter(
    (s: Student) =>
      s.name.toLowerCase().includes(searchKeyword) ||
      s.id.toLowerCase().includes(searchKeyword)
  );

  // Đóng form
  const handleCloseForm = () => {
    setToggle("");
    setEditingStudent(null);
  };

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        <Toolbar isShow={() => setToggle("on")} onSearch={handleSearch} />
        <StudentList
          students={filteredStudents}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />
      </div>

      {toggle && (
        <StudentForm
          toggle={toggle}
          onClose={handleCloseForm}
          student={editingStudent}
          onSubmit={toggle === "on" ? handleAddStudent : handleUpdateStudent}
        />
      )}
    </div>
  );
};

export default StudentManagement;
