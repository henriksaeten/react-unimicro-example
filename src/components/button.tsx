
interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
    const buttonStyle = {
        backgroundColor: '#355CED',
        color: 'white',
        padding: '10px',
        borderRadius: '60px',
        width: '150px',
        height: '50px',
        marginRight: '30px',
        cursor: 'pointer',
        border: 'none',
    };
    return (
        <button style={buttonStyle} onClick={onClick}>{text}</button>
    );
}

export default Button;
