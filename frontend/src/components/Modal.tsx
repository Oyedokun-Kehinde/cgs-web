import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ModalProps {
  show: boolean
  type: 'success' | 'error' | 'info'
  message: string
  onClose: () => void
}

interface ModalConfig {
  icon: string
  color: string
  title: string
}

const Modal = ({ show, type, message, onClose }: ModalProps) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [show])

  const modalConfig: Record<string, ModalConfig> = {
    success: {
      icon: 'bi-check-circle',
      color: 'success',
      title: 'Success!'
    },
    error: {
      icon: 'bi-exclamation-circle',
      color: 'danger',
      title: 'Error'
    },
    info: {
      icon: 'bi-info-circle',
      color: 'info',
      title: 'Information'
    }
  }

  const config = modalConfig[type] || modalConfig.info

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="modal d-block" tabIndex={-1} role="dialog">
            <motion.div
              className="modal-dialog modal-dialog-centered"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-content">
                <div className={`modal-header bg-${config.color} text-white`}>
                  <h5 className="modal-title">
                    <i className={`bi ${config.icon} me-2`}></i>
                    {config.title}
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={onClose}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="mb-0">{message}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className={`btn btn-${config.color}`}
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal
