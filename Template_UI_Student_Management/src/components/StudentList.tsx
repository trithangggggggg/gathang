import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import type { Student } from "../utils/types";

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Mã sinh viên</TableCell>
            <TableCell>Tên sinh viên</TableCell>
            <TableCell>Tuổi</TableCell>
            <TableCell>Giới tính</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((s, i) => (
            <TableRow key={s.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{s.id}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.age}</TableCell>
              <TableCell>{s.gender}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "red", "&:hover": { bgcolor: "darkred" } }}
                  >
                    Xem
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "orange", "&:hover": { bgcolor: "darkorange" } }}
                    onClick={() => onEdit(s)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "green", "&:hover": { bgcolor: "darkgreen" } }}
                    onClick={() => {
                      if (confirm("Bạn có chắc chắn muốn xóa không?")) {
                        onDelete(s.id);
                      }
                    }}
                  >
                    Xóa
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentList;
