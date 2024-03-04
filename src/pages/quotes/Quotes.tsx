import { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { Tab, Tabs, Typography, Box } from '@material-ui/core';
import { fetchTableData } from '@/api';
import { Notification, Table, Modal } from '@/Components';
import { InitTableDataType } from '@/api/quotes/type';

type PropsTypes = {
  value: number;
  index: number;
  children: React.ReactNode;
};

const initialState: InitTableDataType = {
  quotesA: [],
  quotesB: [],
};

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
const Quotes = () => {
  const [value, setValue] = useState(defaultValue);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [contentModal, setContentModal] = useState('');
  const {
    data: tableData,
    error,
    isFetching,
    ...props
  } = useQuery<InitTableDataType, Error>('tableDataNew', fetchTableData, {
    initialData: initialState,
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
    enabled: !openModal,
    keepPreviousData: true,
  });

  const loadingRef = useRef(null);
  useEffect(() => {
    if (!isFetching && !loadingRef.current) {
      loadingRef.current = true;
    }
  }, [loadingRef, isFetching]);
  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  const handleDataColumn = (content: string): void => {
    setContentModal(content);
    setOpenModal(true);
  };

  useEffect(() => {
    if (error) {
      setNotificationMessage(error.message);
    }
    setNotificationOpen(!!error);
  }, [error]);

  return (
    <div>
      <Modal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        content={contentModal}
        title="Статичные данные"
      />
      <h2>Kотировки</h2>
      <Notification message={notificationMessage} open={notificationOpen} />
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example">
        <Tab label="Котировки А"></Tab>
        <Tab label="Котировки Б"></Tab>
      </Tabs>
      <TabPanel value={value} index={0}>
        <Table
          data={tableData.quotesA}
          visible={isFetching && !loadingRef.current}
          handleDataColumn={handleDataColumn}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Table
          data={tableData.quotesB}
          visible={isFetching && !loadingRef.current}
          handleDataColumn={handleDataColumn}
        />
      </TabPanel>
    </div>
  );
};
export default Quotes;
