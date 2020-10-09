import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

const CreateGrid = (props) => {
  let count;

  // Count is now the length of the locations array
  if (props.locations) {
    count = props.locations.length;
  } else {
    count = 0;
  }
  
  const rows = Math.ceil(count / 5);
  const lastRowCount = count % 5 || 5; // If 0, use 5 instead

  let index = 0;

  // First n-1 rows
  const result = [];
  for (var i = 1; i < rows; i++) {
    const innerRow = [];
    for (var j = 0; j < 5; j++) {
      const locationName = props.locations[index].name;
      // We move this in so that we can insert the value
      const segment = (
        <Grid.Column>
          <Segment>{locationName}</Segment>
        </Grid.Column>
      );
      innerRow.push(segment);
      index++;
    }
    const row = (
      <Grid.Row>
        {innerRow}
      </Grid.Row>
    );
    result.push(row);
  }

  if (rows !== 0) {
    // Last row
    const innerRow = [];
    for (var k = 0; k < lastRowCount; k++) {
      const locationName = props.locations[index].name;
      // We move this in so that we can insert the value
      const segment = (
        <Grid.Column>
          <Segment>{locationName}</Segment>
        </Grid.Column>
      );
      innerRow.push(segment);
      index++;
    }
    const row = (
      <Grid.Row>
        {innerRow}
      </Grid.Row>
    );
    result.push(row);
  }

  return result;
};

export default CreateGrid;