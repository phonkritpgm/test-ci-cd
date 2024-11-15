
import styles from './RadioButtonGroup.module.css';
import { IOption, IOptionGroup } from "./InputInterface";
import RadioButton from "./radioButton";
import { v4 as uuidv4 } from 'uuid';

interface RenderOptionsProps {
   options: IOption[];
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 }
 
 const RenderOptions = ({ options, onChange }: RenderOptionsProps) => {
   return options.map(({ label, name, disabled ,color,checked }) => {
    // const optionId = `radio-option-${label.replace(/\s+/g, "")}`;
 
     return (
       <RadioButton
         value={label}
         label={label}
         key={uuidv4()}
         id={uuidv4()}
         name={name}
         disabled={disabled}
         color={color}
         onChange={onChange}
         checked={checked}
       />
     );
   });
 };



interface RadioButtonGroupProps extends  IOptionGroup  {
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 }

const RadioButtonGroup = ({
   label,
   options,
   onChange,
 }: RadioButtonGroupProps) => (
   <fieldset className={styles.StyledFieldset}>
     <legend className={styles.StyledLegend}>{label}</legend>
     <div className={styles.RbGroupWrapper}>
       <RenderOptions options={options} onChange={onChange} />
     </div>
   </fieldset>
 );

export default RadioButtonGroup;