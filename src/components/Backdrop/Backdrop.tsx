interface BackdropProps {
    isOpen: boolean;
    toggleRatingModal: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ isOpen, toggleRatingModal }) =>
    isOpen ? (
        <div className='fixed z-[60] top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.8)]' onClick={() => { console.log('close'); toggleRatingModal(); }} />
    ) : (
        <></>
    );

export default Backdrop;
