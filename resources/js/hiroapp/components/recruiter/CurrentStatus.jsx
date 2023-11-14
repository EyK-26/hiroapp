import axios from "axios";
import React, { useEffect, useState } from "react";

const CurrentStatus = ({ status }) => {
    return <>{status.name}</>;
};

export default CurrentStatus;
