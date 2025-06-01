const input = document.querySelector(".screen");
const output = document.querySelector(".value");
const clearButton = document.querySelector("#clear-screen");
const equalToButton = document.querySelector("#equalTo");
const backspaceBtn = document.getElementById("backspace");

// To clear the screen
clearButton.addEventListener("click" , (evt) => {
    input.innerText = "";
    output.innerText = "";
});

// to check whether ")" can be added or not
function canAddClosingParen(exp)
{
    let openPar=0, closePar=0;
    for(let ch of exp) 
    {
        if(ch === '(') 
        {
            openPar++;
        } 
        else if(ch === ')') 
        {
            closePar++;
        }
    }
    return (openPar > closePar);
}

// adding functionality to the operators
const buttons = document.querySelectorAll("button");
buttons.forEach((btn) => {
    let opr = btn.innerText;
    if(opr!= "C" && opr!= "=" && opr!= "+/-")
    {
        btn.addEventListener("click", (evt) => {
            let exp = input.innerText;
            let lastChar = exp.charAt(exp.length - 1) || ' ';
            if(opr == "x")
            {
                input.innerText = input.innerText + "*";
            }
            else if(opr == "()")
            {
                if(canAddClosingParen(exp))
                {
                    input.innerText = input.innerText + ")";
                }
                else
                {
                    if(!isNaN(lastChar) && lastChar!='' && lastChar!=' ')
                    {
                        input.innerText = input.innerText + "*(";
                    }
                    else
                    {
                        input.innerText = input.innerText + "(";
                    }
                }
            }
            else if(opr == '←')
            {
                if(exp.length > 0)
                {
                    if(exp.length == 1)
                    {
                        input.innerText = "";
                    }
                    else
                    {
                        input.innerText = exp.slice(0, exp.length - 1);
                    }
                }    
            }
            else
            {
                if( (lastChar == ')') && ( !(isNaN(opr)) || (opr == '(') ))
                {
                    input.innerText = input.innerText + "*" + `${opr}`;
                }
                else
                {
                    input.innerText = input.innerText + `${opr}`;
                }
                
            }
            try 
            {
                const result = eval(input.innerText);
                let roundedNum = Number(result).toPrecision(11);
                if(isNaN(roundedNum))
                {
                    output.innerText = "";
                }
                else
                {
                    output.innerText = `${roundedNum}`;
                }
            } 
            catch(err) 
            {
                output.innerText = "";  
            }
        });
    }
});

// to evaluate the expression
equalToButton.addEventListener("click" , (evt) => {
    let exp = input.innerText;
    try 
    {
        const result = eval(exp);
        let roundedNum = Number(result).toPrecision(11);
        input.innerText = `${roundedNum}`;
    } 
    catch(err)
    {
        output.innerText = "Error";
    }
});      