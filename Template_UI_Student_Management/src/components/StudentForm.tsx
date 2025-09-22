import {
  Button,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import React, { useEffect } from "react";
import type { Student } from "../utils/types";

interface StudentFormProps {
  onSubmit: (student: Student) => void;
  toggle: string;
  onClose: () => void;
  student?: Student | null;   // 👈 thêm dòng này
}

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;
type FormChangeEvent = InputChangeEvent | SelectChangeEvent;

const StudentForm: React.FC<StudentFormProps> = ({
  onSubmit,
  toggle,
  onClose,
  student,
}) => {
  const [form, setForm] = React.useState<Student>({
    id: "",
    name: "",
    age: 0,
    gender: "Nam",
    birthday: "",
    hometown: "",
    address: "",
  });

 
  useEffect(() => {
    if (student && toggle === "edit") {
      setForm(student);
    }
  }, [student, toggle]);

  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      id: "",
      name: "",
      age: 0,
      gender: "Nam",
      birthday: "",
      hometown: "",
      address: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border p-4 rounded w-96"
    >
      <TextField
        label="Mã sinh viên"
        name="id"
        value={form.id}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Tên sinh viên"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Tuổi"
        name="age"
        type="number"
        value={form.age}
        onChange={handleChange}
        fullWidth
      />
      <Select name="gender" value={form.gender} onChange={handleChange}>
        <MenuItem value="Nam">Nam</MenuItem>
        <MenuItem value="Nữ">Nữ</MenuItem>
      </Select>
      <TextField
        label="Ngày sinh"
        name="birthday"
        value={form.birthday}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Quê quán"
        name="hometown"
        value={form.hometown}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Địa chỉ"
        name="address"
        value={form.address}
        onChange={handleChange}
        fullWidth
      />

      <div className="flex gap-2 justify-end">
        <Button variant="outlined" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="contained" type="submit">
          {toggle === "on" ? "Thêm" : "Cập nhật"}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;
