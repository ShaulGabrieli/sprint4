

export function OrderStatus({status}) {
    function changeStatusColor(status) {
        switch (status) {
            case 'pending':
                return 'status-yellow'
            case 'approved':
                return 'status-lightblue'

            case 'in progress':
                return 'status-blue'

            case 'done':
                return 'status-green'

            case 'rejected':
                return 'status-pink'
            default:
                return ''
        }
    }
    
    // function getStatusColor(status) {
    //     switch (status) {
    //         case 'pending':
    //             return 'pending-status'
    //         case 'in progress':
    //             return 'in-progress-status'
    //         case 'done':
    //             return 'done-status'
    //         case 'rejected':
    //             return 'rejected-status'
    //         default:
    //            return ''
    //     }
    // }


    return (
        <div className={` ${changeStatusColor(status)} order-status-container`}>
            {status}
        </div>)
}