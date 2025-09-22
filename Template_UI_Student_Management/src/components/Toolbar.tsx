import { Button, TextField } from "@mui/material";

import React from "react";

interface ToolbarProps {
  onSearch: (keyword: string) => void;
  isShow: (key: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onSearch, isShow }) => {
  const [keyword, setKeyword] = React.useState("");

  const handleClickAdd = () => {
    isShow("on");
  };
  // const handleClickOffToggle = ()=>{
  //   isShow("off");
  // }
  return (
    <div className="flex justify-between mb-4">
      <Button variant="contained" color="primary" onClick={handleClickAdd}>
        Thêm mới sinh viên
      </Button>
      <div className="flex gap-2">
        <TextField
          size="small"
          placeholder="Search Here"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="contained" onClick={() => onSearch(keyword)}>
          Tìm kiếm
        </Button>
        <Button variant="outlined">Sắp xếp</Button>
      </div>
    </div>
  );
};

export default Toolbar;
