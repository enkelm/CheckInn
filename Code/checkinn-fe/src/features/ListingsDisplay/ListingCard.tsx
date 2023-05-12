import React, { FC } from 'react';
import CCard from '../../components/UI/Card/Card';
import styled from '@emotion/styled';
import { Listing } from '../../data';

interface ListingCardProps {
  listing: Listing;
}

const Card = styled(CCard)({});

const ListingCard: FC<ListingCardProps> = ({ listing }) => {
  return <Card>{listing?.hotelName}</Card>;
};

export default ListingCard;
