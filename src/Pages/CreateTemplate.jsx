import { useState } from "react";
import { useParams } from "react-router-dom";
import TempHeader from "../Components/TempHeader";
import CenterTab from "../Components/centerTab";
import Qst_form from "../Components/Qst_form";

const CreateTemplate = () => {
  

  return (
    <div>
      <TempHeader></TempHeader>
      <CenterTab></CenterTab>
      <Qst_form></Qst_form>
    </div>
  );
};

export default CreateTemplate;
