import './App.css';
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './components/page/login/index';
import jwt from "jwt-decode";
import DashBoard from './components/page/dashboard/index'
import Setting from './components/page/setting';
import Shop from './components/page/setting/component/shop';
import DiscountRules from './components/page/setting/component/discount';
import CouponInfo from './components/page/setting/component/discount/detail';
import Taxes from './components/page/setting/component/taxes';
import TaxInfo from './components/page/setting/component/taxes/detail';
import TaxAdd from './components/page/setting/component/taxes/add';
import Users from './components/page/setting/component/user/index';
import UserInfo from './components/page/setting/component/user/detail/index';
import UserAdd from './components/page/setting/component/user/add/index'
import CouponAdd from './components/page/setting/component/discount/add';
import ProductCategories from './components/page/setting/component/category';
import ProductCategoryInfo from './components/page/setting/component/category/detail/index';
import ProductCategoryAdd from './components/page/setting/component/category/add/index';
import ProductOptions from './components/page/setting/component/options/index';
import VariantInfo from './components/page/setting/component/options/detail/variants/index';
import VariantAdd from './components/page/setting/component/options/add/variants/index';
import AddonInfo from './components/page/setting/component/options/detail/addons/index';
import AddonAdd from './components/page/setting/component/options/add/addons/index';
import VariantGroupInfo from './components/page/setting/component/options/detail/variants group/index';
import VariantGroupAdd from './components/page/setting/component/options/add/variants group/index';
import AddonGroupInfo from './components/page/setting/component/options/detail/addons group/index';
import AddonGroupAdd from './components/page/setting/component/options/add/addons group/index';
import Customer from './components/page/customer/index';
import CustomerInfo from './components/page/customer/detail/index';
import CustomerAdd from './components/page/customer/add/index';
import Products from './components/page/product/index';
import ProductInfo from './components/page/product/detail/index';
import ProductAdd from './components/page/product/add/index';
import PettyCashes from './components/page/petty cash';
import PettyCashInfo from './components/page/petty cash/detail/index';
import PettyCashAdd from './components/page/petty cash/add/index';
import Receipts from './components/page/receipt';
import ReceiptInfo from './components/page/receipt/detail/index';
import Sell from './components/page/sell';
import {connect} from 'react-redux';
import * as authAction from "./redux/action/auth/index"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            context: {
                user: null,
                setUser: this.setUser,
            },
            loading: true
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })
        let accessToken = localStorage.getItem('accessToken')
        //console.log(this.state.context.user)
        if (accessToken) {
            try {
                // await Api.checkAuth()
                let user = jwt(accessToken)
                this.setUser(user)
            } catch (err) {
                console.log(err)
                this.setUser(null)
                localStorage.removeItem('accessToken')
            }
        }
        // this.setState({ loading: false })
    }

    setUser = (user) => {
        this.props.setUser(user)
    }

    render() {
        // if (this.state.loading) {
        //   return (
        //     <div className="h-100 w-100 bg-primary d-flex justify-content-center">
        //       <ReactLoading type={"bars"} color={"#fff"} height={'20%'} width={'20%'} className="align-self-center mb-5" />
        //     </div >
        //   )
        // }
        return (
            <BrowserRouter>
                {/* <ReactNotification /> */}
                {/* <Header /> */}
                <div className="content">
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/dashboard" exact component={() => <DashBoard />}>
                        </Route>
                        <Route path="/settings" exact component={() => <Setting />}>
                        </Route>
                        <Route path="/settings/shop" exact component={() => <Shop />}>
                        </Route>
                        <Route path="/settings/users" exact component={() => <Users />}>
                        </Route>
                        <Route path="/settings/discount-rules" exact component={() => <DiscountRules />}>
                        </Route>
                        <Route path="/settings/discount-rules/add" exact component={() => <CouponAdd />}>
                        </Route>
                        <Route path="/settings/discount-rules/:id" exact component={() => <CouponInfo />}>
                        </Route>
                        <Route path="/settings/taxes" exact component={() => <Taxes />}>
                        </Route>
                        <Route path="/settings/taxes/add" exact component={() => <TaxAdd />}>
                        </Route>
                        <Route path="/settings/taxes/:id" exact component={(props) => <TaxInfo {...props} />}>
                        </Route>
                        <Route path="/settings/users" exact component={() => <Users />}>
                        </Route>
                        <Route path="/settings/users/add" exact component={() => <UserAdd />}>
                        </Route>
                        <Route path="/settings/users/:id" exact component={(props) => <UserInfo {...props} />}>
                        </Route>
                        <Route path="/settings/product-categories" exact component={() => <ProductCategories />}>
                        </Route>
                        <Route path="/settings/product-categories/add" exact component={() => <ProductCategoryAdd />}>
                        </Route>
                        <Route path="/settings/product-categories/:id" exact component={() => <ProductCategoryInfo />}>
                        </Route>
                        <Route path="/settings/product-options" exact component={() => <ProductOptions />}>
                        </Route>
                        <Route path="/settings/variants/add" exact component={() => <VariantAdd />}>
                        </Route>
                        <Route path="/settings/variants/:id" exact component={() => <VariantInfo />}>
                        </Route>
                        <Route path="/settings/addons/add" exact component={() => <AddonAdd />}>
                        </Route>
                        <Route path="/settings/addons/:id" exact component={() => <AddonInfo />}>
                        </Route>
                        <Route path="/settings/variant-groups/add" exact component={() => <VariantGroupAdd />}>
                        </Route>
                        <Route path="/settings/variant-groups/:id" exact component={() => <VariantGroupInfo />}>
                        </Route>
                        <Route path="/settings/addon-groups/add" exact component={() => <AddonGroupAdd />}>
                        </Route>
                        <Route path="/settings/addon-groups/:id" exact component={() => <AddonGroupInfo />}>
                        </Route>
                        <Route path="/customers" exact component={() => <Customer />}>
                        </Route>
                        <Route path="/customers/add" exact component={() => <CustomerAdd />}>
                        </Route>
                        <Route path="/customers/:id" exact component={() => <CustomerInfo />}>
                        </Route>
                        <Route path="/products" exact component={() => <Products />}>
                        </Route>
                        <Route path="/products/add" exact component={() => <ProductAdd />}>
                        </Route>
                        <Route path="/products/:id" exact component={() => <ProductInfo />}>
                        </Route>
                        <Route path="/expenses" exact component={() => <PettyCashes />}>
                        </Route>
                        <Route path="/expenses/add" exact component={() => <PettyCashAdd />}>
                        </Route>
                        <Route path="/expenses/:id" exact component={() => <PettyCashInfo />}>
                        </Route>
                        <Route path="/receipts" exact component={() => <Receipts />}>
                        </Route>
                        <Route path="/receipts/:id" exact component={() => <ReceiptInfo />}>
                        </Route>
                        <Route path="/sell" exact component={() => <Sell />}>
                        </Route>
                        {/* <PrivateRouter exact path="/" component={<Home />} role={[2, 1, 0]} />
              <PrivateRouter exact path="/account-info" component={<AccountInfo />} role={[2, 1, 0]} />
              <PrivateRouter exact path="/change-password" component={<ChangePassword />} role={[2, 1, 0]} />
              <PrivateRouter exact path="/school-year" component={<SchoolYear />} role={[2]} />
              <PrivateRouter exact path="/class" component={<Class />} role={[2]} />
              <PrivateRouter exact path="/subject" component={<Subject />} role={[2]} />
              <PrivateRouter exact path="/specialist-team" component={<SpecialistTeam />} role={[2]} />
              <PrivateRouter exact path="/student" component={<Student />} role={[2]} />
              <PrivateRouter exact path="/teacher" component={<Teacher />} role={[2]} />
              <PrivateRouter exact path="/teaching-assignment" component={<TeachingAssignment />} role={[2]} />
              <PrivateRouter exact path="/homeroom-teacher-assignment" component={<HomeroomTeacherAssignment />} role={[2]} />
              <PrivateRouter exact path="/specialist-assignment" component={<SpecialistAssignment />} role={[2]} />
              <PrivateRouter exact path="/student-assignment" component={<StudentAssignment />} role={[2]} />
              <PrivateRouter exact path="/account" component={<Account />} role={[2]} />
              <PrivateRouter exact path="/transfer-class" component={<TransferClass />} role={[2]} />
              <PrivateRouter exact path="/score-lock" component={<ScoreLock />} role={[2]} />
              <PrivateRouter exact path="/search-teacher" component={<SearchTeacher />} role={[2]} />
              <PrivateRouter exact path="/search-student" component={<SearchStudent />} role={[2]} />
              <PrivateRouter exact path="/search-homeroom-teacher-assignment" component={<SearchHomroomTeacherAssignment />} role={[2]} />
              <PrivateRouter exact path="/search-teaching-assignment" component={<SearchTeachingAssignment />} role={[2]} />
              <PrivateRouter exact path="/teaching-class-score" component={<TeachingClassScore />} role={[2, 1]} />
              <PrivateRouter exact path="/my-teaching-assignment" component={<MyTeachingAssignment />} role={[2, 1]} />
              <PrivateRouter exact path="/my-teaching-assignment-edit" component={<MyTeachingAssignmentEdit />} role={[2, 1]} />
              <PrivateRouter exact path="/conduct-assesssment" component={<ConductAssessment />} role={[2, 1]} />
              <PrivateRouter exact path="/statistic-rank" component={<RankStatistic />} role={[2]} />
              <PrivateRouter exact path="/statistic-subject" component={<SubjectStatistic />} role={[2]} />
              <PrivateRouter exact path="/student-score" component={<StudentScore />} role={[0]} />
              <PrivateRouter exact path="/homeroom-statistic-rank" component={<HomeroomRankStatistic />} role={[2, 1]} />
              <PrivateRouter exact path="/homeroom-statistic-subject" component={<HomeroomSubjectStatistic />} role={[2, 1]} />
              <PrivateRouter exact path="/search-homeroom-class-info" component={<SearchHomeroomClassInfo />} role={[2, 1]} />
              <PrivateRouter exact path="/search-score" component={<SearchScore />} role={[2, 1]} />
              <PrivateRouter exact path="/student-attendance" component={<StudentAttendance />} role={[2, 1]} />
              <PrivateRouter exact path="/pll" component={<PLL />} role={[2, 1]} />
              <PrivateRouter exact path="/student-pll" component={<StudentPLL />} role={[0]} /> */}
                        {/* <Route path="/">
                <Page404 />
              </Route> */}
                    </Switch>
                </div>
                {/* <Footer /> */}
            </BrowserRouter>
        )
    }
}

// class PrivateRouter extends React.Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//     }
//   }
//   checkLogin = () => {
//     return this.context.user
//   }
//   checkAuth = () => {
//     return this.props.role && this.context.user && this.props.role.includes(this.context.user.role)
//   }
//   render() {
//     let { component: Component, ...rest } = this.props;
//     return (
//       <Route {...rest}>
//         {this.checkLogin() ?
//           this.checkAuth() ?
//             Component :
//             <Redirect
//               to='/'
//             /> :
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: this.props.path }
//             }}
//           />
//         }
//       </Route>
//     )
//   }
// }

const mapStateToProp = (state) => {
    return {
        user: state.authReducer
    }
}
const mapDispatchToProp = (dispatch, _props) => {
    return {
        setUser: (userInfo) => {
            dispatch(authAction.setUserInfo(userInfo))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(App);