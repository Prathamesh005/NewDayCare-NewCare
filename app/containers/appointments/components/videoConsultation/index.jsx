import { Box } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//-------------
import Video from 'twilio-video';
import Room from '../../../../components/videoCall/Room';
import { getQueryStringValByKey } from '../../../../hooks/useQueryParam';

function VideoConsultation(props) {
  const patientId = getQueryStringValByKey('patientId');
  const practitionerId = getQueryStringValByKey('practitionerId');

  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const handlePushNotification = () => {
    alert(1);
    const payload = {
      // resourceId: 'b33d509f-b49f-4ab1-8a81-2f77fab29b5b',
      resourceId: patientId,
      type: 'Call',
      roomName: practitionerId,
    };
    new Promise((resolve, reject) => {
      props.pushVideoNotification(payload, resolve, reject);
    });
  };

  const handleLogout = useCallback(() => {
    setRoom(prevRoom => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach(trackPub => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  const handleCreateRoom = useCallback(async () => {
    if (!practitionerId) return;

    setConnecting(true);
    const newToken = `https://redwood-wolf-9599.twil.io/videoToken?identity=${practitionerId}&roomName=${practitionerId}`;

    const data = await fetch(newToken, {
      method: 'GET',
    }).then(res => res.json());

    Video.connect(data.accessToken, {
      name: practitionerId,
    })
      .then(room => {
        setConnecting(false);
        setRoom(room);
        if (data.accessToken) {
          handlePushNotification();
        }
      })
      .catch(err => {
        console.error(err);
        setConnecting(false);
      });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = event => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener('pagehide', tidyUp);
      window.addEventListener('beforeunload', tidyUp);
      return () => {
        window.removeEventListener('pagehide', tidyUp);
        window.removeEventListener('beforeunload', tidyUp);
      };
    }
  }, [room, handleLogout]);

  useEffect(() => {
    if (patientId && practitionerId) {
      handleCreateRoom();
    }
  }, []);

  return (
    <Box>
      {room ? (
        <Room room={room} handleLogout={handleLogout} />
      ) : (
        <Box>{connecting ? 'Connecting' : 'No room'}</Box>
      )}
    </Box>
  );
}

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    // pushVideoNotification: (payload, resolve, reject) =>
    //   dispatch(actions.pushVideoNotification(payload, resolve, reject)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoConsultation);
