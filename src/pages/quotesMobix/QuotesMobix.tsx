import { useState, useEffect, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Tabs, Typography, Box, Button } from '@material-ui/core';
import { Notification, Table, Modal } from '@/Components';
import quotesMob from '@/store/quotes';

type PropsTypes = {
  value: number;
  index: number;
  children: React.ReactNode;
};

type TimerType = null | NodeJS.Timeout;

function TabPanel(props: PropsTypes) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const defaultValue = 0;
const QuotesMobLazy = observer(() => {
  const [value, setValue] = useState(defaultValue);
  const [visible, setVisible] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [contentModal, setContentModal] = useState('');

  const loadingRef = useRef(null);
  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  const wrapperFetchTableData = useCallback(async () => {
    try {
      await quotesMob.fetchTableData();
      setNotificationMessage('');
      setNotificationOpen(false);
    } catch (err) {
      setNotificationMessage(err.message);
      console.error(err);
      setNotificationOpen(true);
    } finally {
      if (visible) {
        setVisible(false);
      }
    }
  }, []);

  useEffect(() => {
    let timerId: TimerType = null;
    if (!openModal) {
      timerId = setInterval(wrapperFetchTableData, 5000);
    } else {
      clearTimeout(timerId);
    }
    return () => clearTimeout(timerId);
  }, [wrapperFetchTableData, notificationOpen, openModal]);

  const handleDataColumn = (content: string): void => {
    setContentModal(content);
    setOpenModal(true);
  };

  return (
    <div>
      <Modal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        content={contentModal}
        title="Статичные данные"
      />
      <h2>Котировки на mobix</h2>
      <Notification message={notificationMessage} open={notificationOpen} />
      <Button onClick={quotesMob.fetchTableData}>fetchTableData</Button>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example">
        <Tab label="Котировки А"></Tab>
        <Tab label="Котировки Б"></Tab>
      </Tabs>
      <TabPanel value={value} index={0}>
        <Table
          data={quotesMob.tableData.quotesA}
          visible={false && !loadingRef.current}
          handleDataColumn={handleDataColumn}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Table
          data={quotesMob.tableData.quotesB}
          visible={false && !loadingRef.current}
          handleDataColumn={handleDataColumn}
        />
      </TabPanel>
    </div>
  );
});
export default QuotesMobLazy;
