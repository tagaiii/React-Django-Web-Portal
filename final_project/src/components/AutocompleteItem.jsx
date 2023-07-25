import React from "react";
import { forwardRef } from "react";
import {
  Group,
  Avatar,
  Text,
  MantineColor,
  SelectItemProps,
} from "@mantine/core";
import { Link } from "react-router-dom";

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  header: string;
  image: string;
}

export const AutoCompleteItem = forwardRef(
  ({ id, value, image, className }: ItemProps, ref) => {
    return (
      <Link to={image ? `/articles/${id}` : `/forum/threads/${id}`}>
        <div ref={ref} className={`hover:bg-slate-100 ${className}`}>
          <Group noWrap>
            {image && <Avatar size={"lg"} src={image} />}
            <div>
              <Text>{value}</Text>
            </div>
          </Group>
        </div>
      </Link>
    );
  }
);
