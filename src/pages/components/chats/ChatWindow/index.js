import React from 'react';
import { Box, Stack } from '@mui/material';

const ChatWindow = () => {
  return (
    <Stack direction="column" justifyContent="space-around">
      <Box sx={{ backgroundColor: 'red' }}>
        {/* {[1, 2, 3].map((value) => (
          <div>
            <ChatMsg
              avatar={''}
              messages={[
                'Hi Jenny, How r u today?',
                'Did you train yesterday',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
              ]}
            />
            <ChatMsg
              side={'right'}
              messages={[
                "Great! What's about you?",
                'Of course I did. Speaking of which check this out',
              ]}
            />
            <ChatMsg avatar={''} messages={['Im good.', 'See u later.']} />
          </div>
        ))} */}
      </Box>
      <Box sx={{ backgroundColor: 'blue' }}>
        <Stack direction="row">dsf</Stack>
      </Box>
    </Stack>
  );
};

export default ChatWindow;
