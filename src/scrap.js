{
    {item}==="X"?<Border>{item}</Border> : ({item}==="Y"?<Surprise>{item}</Surprise>:<Blank>{item}</Blank>)
}
const Border=styled.h4`
color: blue;
`
const Surprise=styled.h4`
color: green;
`
const Blank = styled.h4`
color: white;
`
