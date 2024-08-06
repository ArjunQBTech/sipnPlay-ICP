import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import infinite from '../../assets/images/icons/infinity.png';
import id from '../../assets/images/icons/id.png';
import stoic from '../../assets/images/icons/stoic.png';
import plug from '../../assets/images/icons/plug.png';

import AnimationButton from '../../common/AnimationButton';
import Modal from 'react-modal';

import { RxCross1 } from "react-icons/rx";
import { useAuth } from "../../utils/useAuthClient";
import toast from 'react-hot-toast';

const JoinWaitlist = ({ modalIsOpen, setIsOpen }) => {
  const { login } = useAuth();
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="fixed  inset-0 flex items-center justify-center bg-transparent"
        overlayClassName="fixed z-[100] inset-0 bg-gray-800 bg-opacity-50"
      >
        <div className='bg-black p-[15px] md:p-[20px] relative w-[29%]  md:h-[578px] border border-[#696969] rounded-xl'>
          <p className='text-center text-white font-monckeberg text-2xl md:text-2xl lg:text-3xl lg1:text-4xl'>Wallets </p>
          <img className='absolute left-3 top-4 w-[150px] h-[50px] md:w-[100px] lg:w-[100px] lg:h-[30px] ' draggable="false" src={logo} />

          <div className='w-full md:w-auto mt-8 md:mt-0'>
            <button
              onClick={closeModal}
              className="text-white absolute top-6 right-6"
            >
              <RxCross1 />
            </button>
            <div className="w-[320px] flex flex-col border-t border-gray-400 pt-5  top-[18%] right-[13%] justify-center   absolute ">
              <div className="mb-4">
                <button onClick={()=>login("ii")} className="w-full bg-[#303030] text-white py-2 rounded-[10px] flex items-center">
                  <div className="flex items-center justify-center  ml-2 py-3 px-2 bg-[#3D3F47] rounded">
                    <img src={infinite} alt="ICP Login" className="w-6" />
                  </div>
                  <span className="ml-3">ICP Login</span>
                </button>
              </div>
              <div className="mb-4">
                <button onClick={()=>login("nfid")} className="w-full bg-[#303030] text-white py-2 rounded-[10px] flex items-center">
                  <div className="flex items-center justify-center  ml-2 py-2 px-2 bg-[#3D3F47] rounded">
                    <img src={id} alt="ICP Login" className="w-6" />
                  </div>
                  <span className="ml-3">NFID</span>
                </button>
              </div>
              <div className="mb-4">
                <button onClick={()=>login("stoic")} className="w-full bg-[#303030] text-white py-2 rounded-[10px] flex items-center">
                  <div className="flex items-center justify-center  ml-2 py-2 px-2 bg-[#3D3F47] rounded">
                    <img src={stoic} alt="Stoic Login" className="w-6" />
                  </div>
                  <span className="ml-3">Stoic</span>
                </button>
              </div>
              <div className="mb-4">
                <button onClick={()=>login("plug")} className="w-full bg-[#303030] text-white py-2 rounded-[10px] flex items-center">
                  <div className="flex items-center justify-center  ml-2 py-2 px-2 bg-[#3D3F47] rounded">
                    <img src={plug} alt="plug" className="w-6" />
                  </div>
                  <span className="ml-3">Plug</span>
                </button>
              </div>
              <div className="flex items-center border-t border-gray-400 my-2 py-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mr-2 mb-10 "
                />
                <label htmlFor="terms" className="text-white">By connecting a wallet, you agree to [company name] Terms of Service and consent to its Privacy Policy.<span className=' text-blue-600'> Learn more</span></label>
              </div>
              <div className='flex mb-4  justify-center'>
                <AnimationButton text='Connect Wallet' />
              </div>
            </div>

          </div>
        </div>
      </Modal>
    </div>
  );
}

export default JoinWaitlist;
