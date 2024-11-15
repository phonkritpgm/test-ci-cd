import { InputHTMLAttributes } from "react";

export interface InputElementProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  disabled?: boolean;
}

export interface IOption {
    label: string;
    name?: string;
    color?:string;
    disabled?: boolean;
    checked?:boolean;
 }
 
 export interface IOptionGroup {
    label: string;
    options: IOption[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
 }
