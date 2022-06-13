import React from 'react';
import { Helmet } from 'react-helmet';
import { AllMetaTagMessages } from '../../constants';

export default function TitleComponent({ title }) {
  var defaultTitle =
    'nuQare - AI/ML Enabled Platform for Intelligent Patient Care';
  let newTitle = '';

  let findMatch = AllMetaTagMessages.find(data => data.path === title);
  newTitle = findMatch
    ? `${findMatch.metaConfig.title} :: ${defaultTitle}`
    : defaultTitle;

  return (
    <Helmet>
      <title>{newTitle}</title>
    </Helmet>
  );
}
