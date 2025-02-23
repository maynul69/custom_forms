import { useState } from "react";
import { useParams } from "react-router-dom";
import TempHeader from "../Components/TempHeader";

import Qst_form from "../Components/Qst_form";
import Navbar from "../Components/Navbar";

const CreateTemplate = () => {
  

  return (
    <div>
      <Navbar></Navbar>
      <TempHeader></TempHeader>

      <Qst_form></Qst_form>
    </div>
  );
};

export default CreateTemplate;
