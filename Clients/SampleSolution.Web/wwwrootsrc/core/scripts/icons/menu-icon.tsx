/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export const MenuIcon = (props: any): JSX.Element => (
    <SvgIcon {...props}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </SvgIcon>
);
