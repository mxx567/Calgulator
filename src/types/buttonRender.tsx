type types = | "number"
             | "operator"
             | "clear"
             | "delete"
             | "equals";

interface ButtonDesc{
  text: string,
  type: types     
}

export default ButtonDesc;