

export function OrderStatus({status}) {
    function getStatusColor(status) {
        switch (status) {
            case 'pending':
                return 'pending-status'
            case 'in progress':
                return 'in-progress-status'
            case 'done':
                return 'done-status'
            case 'rejected':
                return 'rejected-status'
            default:
               return ''
        }
    }


    return (
        <div className={`order-status-container ${getStatusColor(status)}`}>
            {status}
        </div>)
}