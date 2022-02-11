import './UserList.css';

function UserList(){
    return(
        <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="main-box clearfix">
                    <div class="table-responsive">
                        <table class="table user-list">
                            <thead>
                                <tr>
                                    <th><span>User</span></th>
                                    <th><span>Created Date</span></th>
                                    <th><span>Email</span></th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span class="user-link">Mila Kunis</span>
                                        <span class="user-subhead">Project Leader</span>
                                    </td>
                                    <td>
                                        2021/08/08
                                    </td>
                                    <td>
                                        <a href="mailto:mila@kunis.com">mila@kunis.com</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="user-link">John Smith</span>
                                        <span class="user-subhead">Member</span>
                                    </td>
                                    <td>
                                        2021/12/05
                                    </td>
                                    <td>
                                        <a href="mailto:john@smith.com">john@smith.com</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="user-link">Hannah Lee</span>
                                        <span class="user-subhead">Member</span>
                                    </td>
                                    <td>
                                        2021/04/02
                                    </td>
                                    <td>
                                        <a href="mailto:han@lee.com">han@lee.com</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="user-link">Angelica Harris</span>
                                        <span class="user-subhead">Registered</span>
                                    </td>
                                    <td>
                                        2021/06/11
                                    </td>
                                    <td>
                                        <a href="alica@harris.com">alica@harris.com</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="user-link">Luke Hudson</span>
                                        <span class="user-subhead">Member</span>
                                    </td>
                                    <td>
                                        2021/02/12
                                    </td>
                                    <td>
                                        <a href="luke@hudson.com">luke@hudson.com</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="user-link">Emerson Cole</span>
                                        <span class="user-subhead">Registered</span>
                                    </td>
                                    <td>
                                        2021/09/23
                                    </td>
                                    <td>
                                        <a href="emerson@cole.com">emerson@cole.com</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="user-link">Robin Austin</span>
                                        <span class="user-subhead">Prject Leader</span>
                                    </td>
                                    <td>
                                        2022/01/04
                                    </td>
                                    <td>
                                        <a href="rob@austin.com">rob@austin.com</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default UserList;