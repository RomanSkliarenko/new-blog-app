import React from 'react';

export interface IProp {
  setEditUserFlag: React.Dispatch<React.SetStateAction<boolean>>;
  editUserFlag: boolean;
}

export interface IValues {
  name: string;
  extra_details: string;
  skills: string;
  profession: string;
  details: string;
}
