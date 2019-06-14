import { Row, Col } from 'react-flexbox-grid';
import { faCheck, faTimes, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import TransactionForm from './TransactionForm';
import TransactionResult from './TransactionResult';

function PayInvoicePage() {
  const inputs = {
    address: {
      label: 'Client address',
      isValid: value => value.match(/^[1-9]\d{0,19}L$/),
    },
    amount: {
      label: 'Amount',
      isValid: value => value.match(/^\d+(\.\d{1,8})?$/),
    },
    description: {
      label: 'Description',
      isValid: () => true,
    },
  };

  const [state, setState] = React.useState({ });

  const isFormValid = inputsData => (
    !Object.values(inputsData).find(({ error }) => error)
  );

  const onPayClick = (inputsData) => {
    setState({
      sentStatus: {
        pending: true,
        header: 'Sending...',
        icon: faCircleNotch,
      },
    });
    setTimeout(() => {
      if (isFormValid(inputsData)) {
        setState({
          sentStatus: {
            sucess: true,
            header: 'Payment Success',
            icon: faCheck,
            message: 'Your payment was sucesfully sent and will be processed by the blockchanin soon.',
          },
        });
      } else {
        setState({
          sentStatus: {
            sucess: false,
            header: 'Payment Failed',
            icon: faTimes,
            message: 'Sending paiment failed. Please try again.',
          },
        });
      }
    }, 1000);
  };

  const { sentStatus } = state;

  return (
    <Row start="xs">
      <Col xs={12} mdOffset={1} md={10} lgOffset={2} lg={8}>
        {!sentStatus ?
          <TransactionForm title="Pay Invoice" inputs={inputs} callback={onPayClick} submitButtonLabel="Pay" /> :
          <TransactionResult {...sentStatus} />
        }
      </Col>
    </Row>
  );
}

export default PayInvoicePage;