import React, { useEffect, useState } from "react";
import { Wrapper } from "./styles";
import { ReactTable, TableBody, TableRow, TableData } from "../../components/Table/styles";
import apis from "../../apis";

const Profile = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(0);
    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true);
                const res = await apis.user.getProfile();
                setUser(res);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };

        setReload(0);
        getUser();
    }, [reload]);

    let d = new Date(user.createdAt);
    const date = `${d.getUTCDate()}.${d.getUTCMonth() + 1}.${d.getUTCFullYear()}`;

    return (
        <Wrapper>
            <h2>My profile</h2>
            <ReactTable>
                <TableBody>
                    <TableRow>
                        <TableData>Full name</TableData>
                        <TableData>
                            <strong>{user.name}</strong>
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>Email</TableData>
                        <TableData>
                            <strong>{user.email}</strong>
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>Phone number</TableData>
                        <TableData>
                            <strong>{user.phoneNumber}</strong>
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>Address</TableData>
                        <TableData>
                            <strong>{user.address}</strong>
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>Gender</TableData>
                        <TableData>
                            <strong>{user.gender? "Male": "Female"}</strong>
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>Admin</TableData>
                        <TableData>
                            <strong>{user.isAdmin? "True": "False"}</strong>
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>Created at</TableData>
                        <TableData>
                            <strong>{date}</strong>
                        </TableData>
                    </TableRow>
                </TableBody>
            </ReactTable>
        </Wrapper>
    );
};

export default Profile;
