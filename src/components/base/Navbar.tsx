import { useState } from "react";
import Button from "../ui/Button";
import MPINModal from "./PinModal";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  function openConfirmationModal() {
    setModal(true);
  }
  function closeModal() {
    setModal(false);
  }
  function handleVerification() {
    navigate("/orders");
    setModal(false);
  }
  return (
    <nav className="h-20   flex justify-between items-center paddings">
      <div className="flex items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-foreground tracking-wide"
        >
          PRINT WEB
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Button onClick={openConfirmationModal} size="md" variant="primary">
          Orders
        </Button>
      </div>
      {modal && (
        <MPINModal
          open={modal}
          onClose={closeModal}
          onVerify={handleVerification}
        />
      )}
    </nav>
  );
};

export default Navbar;
