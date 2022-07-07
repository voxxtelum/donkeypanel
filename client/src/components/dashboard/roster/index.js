import { useState, useEffect } from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar,
  TableEditColumn,
  TableEditRow,
  SearchPanel,
} from '@devexpress/dx-react-grid-material-ui';

import {
  SortingState,
  EditingState,
  SearchState,
  IntegratedSorting,
  IntegratedFiltering,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';

import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import { Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import {
  GET_MEMBERS,
  UPDATE_MEMBER,
  MEMBERS_SUBSCRIPTION,
} from '../_helpers/queries';

import { game } from '../../../constants/game';

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    backgroundColor: 'rgba(0,27,46,0.25)',
    padding: theme.spacing(2),
    border: '1px solid rgba(254, 246, 246, 0.1)',
    borderRadius: '4px',
    '& .MuiTableCell-root': {
      border: 'none',
      padding: '12px 8px',
    },
  },
}));

function SubAlert(props) {
  return <Alert {...props}>{props.text}</Alert>;
}

const getClassColor = (value) => {
  let c = value.toLowerCase();
  return game.classes[c].primaryColor;
};

const ClassFormatter = ({ value }) => (
  <span style={{ color: getClassColor(value) }}>{value}</span>
);

const ClassColorProvider = (props) => (
  <DataTypeProvider formatterComponent={ClassFormatter} {...props} />
);

const SearchCustomComponent = ({ value, onValueChange }) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    onValueChange(targetValue);
  };

  return (
    <TextField
      label="search"
      variant="outlined"
      size="small"
      value={value === undefined ? '' : value}
      onChange={handleChange}
    />
  );
};

const Roster = () => {
  const classes = useStyles();

  const [rows, setRows] = useState({});
  let memberData;
  const { loading, data, subscribeToMore } = useQuery(GET_MEMBERS);

  if (!loading) memberData = data.getAllMembers.members;

  const [classColumn] = useState(['class']);
  const [idColumn] = useState(['_id']);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [sortingStateColumnExtensions] = useState([
    { columnName: '_id', sortingEnabled: false },
  ]);
  const [searchValue, setSearchValue] = useState('');

  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  const CustomEditFormatter = ({ value, row: { rowId }, columnn }) => (
    <Button
      size="small"
      color="primary"
      id={value}
      onClick={() => handleEditClick(rowId)}
    >
      Edit
    </Button>
  );

  const CustomEditProvider = (props) => (
    <DataTypeProvider formatterComponent={CustomEditFormatter} {...props} />
  );

  const handleEditClick = (value) => {
    console.log(value);
  };
  const CustomEdit = (props) => {
    const CustomEditFormatter = ({ value, row, columnn }) => (
      <Button
        size="small"
        color="primary"
        id={value}
        onClick={() => handleEditClick(row.rowId)}
      >
        Edit
      </Button>
    );

    const CustomEditProvider = (props) => (
      <DataTypeProvider formatterComponent={CustomEditFormatter} {...props} />
    );

    return (
      <Plugin name="customEditButton">
        <Template name="tableCell">
          <TemplateConnector>
            {(
              { tableBodyRows, editingRowIds, value, row },
              {
                startEditRows,
                cancelChangedRows,
                stopEditRows,
                commitChangedRows,
              }
            ) => {
              return (
                <DataTypeProvider>
                  <Button
                    size="small"
                    color="primary"
                    id={value}
                    onClick={() => handleEditClick(row.rowId)}
                  >
                    Edit
                  </Button>
                </DataTypeProvider>
              );
            }}
          </TemplateConnector>
          <TemplatePlaceholder />
        </Template>
      </Plugin>
    );
  };

  const { data: memberUpdated } = useSubscription(UPDATE_MEMBER, {
    fetchPolicy: 'network-only',
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      let message = data.memberUpdated.message;
      setSnackMessage(message);
      setSnackOpen(true);
    },
  });

  if (loading) return <p>Data is loading...</p>;
  //if (!memberData) return <p>Data Not Loading</p>;

  subscribeToMore({
    document: MEMBERS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newMember = subscriptionData.data.memberAdded;
      return Object.assign({}, prev, {
        getAllMembers: {
          members: [newMember, ...prev.getAllMembers.members],
        },
      });
    },
  });

  //const memberData = getAllMembers.members;

  const columns = [
    { name: 'username', title: 'Name' },
    {
      name: 'mainname',
      title: 'Main',
      getCellValue: (memberData) =>
        memberData.main ? memberData.main.username : undefined,
    },
    {
      name: 'class',
      title: 'Class',
    },

    { name: 'role', title: 'Role' },
    { name: 'guildRank', title: 'Rank' },
    { name: '_id', title: ' ' },
  ];

  // const changeAddedRows = (value) => {
  //   const initialized = value.map((row) =>
  //     Object.keys(row).length ? row : { city: 'Tokio' }
  //   );
  //   setAddedRows(initialized);
  // };

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      // changedRows = rows.map((row) =>
      //   changed[row.id] ? { ...row, ...changed[row.id] } : row
      // );
      console.log(changed);
      console.log(changed[0]);
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter((row) => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  const getRowId = (row) => row._id;

  return (
    <>
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SubAlert
          onClose={handleSnackClose}
          variant="filled"
          severity="success"
          text={snackMessage}
        />
      </Snackbar>
      <h1>Roster</h1>
      <div className={classes.tableWrapper}>
        <Grid rows={memberData} columns={columns} getRowId={getRowId}>
          <SortingState columnExtensions={sortingStateColumnExtensions} />
          <SearchState value={searchValue} onValueChange={setSearchValue} />
          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={setEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={setRowChanges}
            addedRows={addedRows}
            //onAddedRowsChange={changeAddedRows}
            onCommitChanges={commitChanges}
          />
          <IntegratedSorting />
          <IntegratedFiltering />
          <ClassColorProvider for={classColumn} />
          <CustomEditProvider for={idColumn} />
          {/* <CustomEdit for={idColumn} /> */}
          <Table />
          <TableHeaderRow showSortingControls />

          <TableEditColumn showEditCommand />
          <TableEditRow />

          <Toolbar />
          <SearchPanel inputComponent={SearchCustomComponent} />
        </Grid>
      </div>
    </>
  );
};

export default Roster;
