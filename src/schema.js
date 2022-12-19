const { gql } = require('apollo-server-cloudflare')

const typeDefs = gql`
  type Query {
    domains(
      shopper_id: String
      statuses: [DomainStatuses]
      status_groups: [DomainStatusGroups]
      limit: Int
      marker: String
      includes: [DomainIncludes]
      modified_date: String
    ): [Domain]
    domain_agreements(
      market_id: String
      tlds: [String]!
      privacy: Boolean!
      for_transfer: Boolean
    ): [DomainAgreement]
    domain_availability(
      domain: String!
      check_type: DomainAvailabilityCheckType
      for_transfer: Boolean
    ): DomainAvailabilityResponse
    domains_availability(
      domains: [String]!
      check_type: DomainAvailabilityCheckType
    ): [DomainAvailabilityResponse]
    supported_tlds: [SupportedTLD]
    domain(domain: String!): Domain
  }

  enum DomainStatuses {
    ACTIVE
    AWAITING_CLAIM_ACK
    AWAITING_DOCUMENT_AFTER_TRANSFER
    AWAITING_DOCUMENT_AFTER_UPDATE_ACCOUNT
    AWAITING_DOCUMENT_UPLOAD
    AWAITING_FAILED_TRANSFER_WHOIS_PRIVACY
    AWAITING_PAYMENT
    AWAITING_RENEWAL_TRANSFER_IN_COMPLETE
    AWAITING_TRANSFER_IN_ACK
    AWAITING_TRANSFER_IN_AUTH
    AWAITING_TRANSFER_IN_AUTO
    AWAITING_TRANSFER_IN_WHOIS
    AWAITING_TRANSFER_IN_WHOIS_FIX
    AWAITING_VERIFICATION_ICANN
    AWAITING_VERIFICATION_ICANN_MANUAL
    CANCELLED
    CANCELLED_HELD
    CANCELLED_REDEEMABLE
    CANCELLED_TRANSFER
    CONFISCATED
    DISABLED_SPECIAL
    EXCLUDED_INVALID_CLAIM_FIREHOSE
    EXPIRED_REASSIGNED
    FAILED_BACKORDER_CAPTURE
    FAILED_DROP_IMMEDIATE_THEN_ADD
    FAILED_PRE_REGISTRATION
    FAILED_REDEMPTION
    FAILED_REDEMPTION_REPORT
    FAILED_REGISTRATION
    FAILED_REGISTRATION_FIREHOSE
    FAILED_RESTORATION_REDEMPTION_MOCK
    FAILED_SETUP
    FAILED_TRANSFER_IN
    FAILED_TRANSFER_IN_BAD_STATUS
    FAILED_TRANSFER_IN_REGISTRY
    HELD_COURT_ORDERED
    HELD_DISPUTED
    HELD_EXPIRATION_PROTECTION
    HELD_EXPIRED_REDEMPTION_MOCK
    HELD_REGISTRAR_ADD
    HELD_REGISTRAR_REMOVE
    HELD_SHOPPER
    HELD_TEMPORARY
    LOCKED_ABUSE
    LOCKED_COPYRIGHT
    LOCKED_REGISTRY
    LOCKED_SUPER
    PARKED_AND_HELD
    PARKED_EXPIRED
    PARKED_VERIFICATION_ICANN
    PENDING_ABORT_CANCEL_SETUP
    PENDING_AGREEMENT_PRE_REGISTRATION
    PENDING_APPLY_RENEWAL_CREDITS
    PENDING_BACKORDER_CAPTURE
    PENDING_BLOCKED_REGISTRY
    PENDING_CANCEL_REGISTRANT_PROFILE
    PENDING_COMPLETE_REDEMPTION_WITHOUT_RECEIPT
    PENDING_COMPLETE_REGISTRANT_PROFILE
    PENDING_COO
    PENDING_COO_COMPLETE
    PENDING_DNS
    PENDING_DNS_ACTIVE
    PENDING_DNS_INACTIVE
    PENDING_DOCUMENT_VALIDATION
    PENDING_DOCUMENT_VERIFICATION
    PENDING_DROP_IMMEDIATE
    PENDING_DROP_IMMEDIATE_THEN_ADD
    PENDING_EPP_CREATE
    PENDING_EPP_DELETE
    PENDING_EPP_UPDATE
    PENDING_ESCALATION_REGISTRY
    PENDING_EXPIRATION
    PENDING_EXPIRATION_RESPONSE
    PENDING_EXPIRATION_SYNC
    PENDING_EXPIRED_REASSIGNMENT
    PENDING_EXPIRE_AUTO_ADD
    PENDING_EXTEND_REGISTRANT_PROFILE
    PENDING_FAILED_COO
    PENDING_FAILED_EPP_CREATE
    PENDING_FAILED_HELD
    PENDING_FAILED_PURCHASE_PREMIUM
    PENDING_FAILED_RECONCILE_FIREHOSE
    PENDING_FAILED_REDEMPTION_WITHOUT_RECEIPT
    PENDING_FAILED_RELEASE_PREMIUM
    PENDING_FAILED_RENEW_EXPIRATION_PROTECTION
    PENDING_FAILED_RESERVE_PREMIUM
    PENDING_FAILED_SUBMIT_FIREHOSE
    PENDING_FAILED_TRANSFER_ACK_PREMIUM
    PENDING_FAILED_TRANSFER_IN_ACK_PREMIUM
    PENDING_FAILED_TRANSFER_IN_PREMIUM
    PENDING_FAILED_TRANSFER_PREMIUM
    PENDING_FAILED_TRANSFER_SUBMIT_PREMIUM
    PENDING_FAILED_UNLOCK_PREMIUM
    PENDING_FAILED_UPDATE_API
    PENDING_FRAUD_VERIFICATION
    PENDING_FRAUD_VERIFIED
    PENDING_GET_CONTACTS
    PENDING_GET_HOSTS
    PENDING_GET_NAME_SERVERS
    PENDING_GET_STATUS
    PENDING_HOLD_ESCROW
    PENDING_HOLD_REDEMPTION
    PENDING_LOCK_CLIENT_REMOVE
    PENDING_LOCK_DATA_QUALITY
    PENDING_LOCK_THEN_HOLD_REDEMPTION
    PENDING_PARKING_DETERMINATION
    PENDING_PARK_INVALID_WHOIS
    PENDING_PARK_INVALID_WHOIS_REMOVAL
    PENDING_PURCHASE_PREMIUM
    PENDING_RECONCILE
    PENDING_RECONCILE_FIREHOSE
    PENDING_REDEMPTION
    PENDING_REDEMPTION_REPORT
    PENDING_REDEMPTION_REPORT_COMPLETE
    PENDING_REDEMPTION_REPORT_SUBMITTED
    PENDING_REDEMPTION_WITHOUT_RECEIPT
    PENDING_REDEMPTION_WITHOUT_RECEIPT_MOCK
    PENDING_RELEASE_PREMIUM
    PENDING_REMOVAL
    PENDING_REMOVAL_HELD
    PENDING_REMOVAL_PARKED
    PENDING_REMOVAL_UNPARK
    PENDING_RENEWAL
    PENDING_RENEW_EXPIRATION_PROTECTION
    PENDING_RENEW_INFINITE
    PENDING_RENEW_LOCKED
    PENDING_RENEW_WITHOUT_RECEIPT
    PENDING_REPORT_REDEMPTION_WITHOUT_RECEIPT
    PENDING_RESERVE_PREMIUM
    PENDING_RESET_VERIFICATION_ICANN
    PENDING_RESPONSE_FIREHOSE
    PENDING_RESTORATION
    PENDING_RESTORATION_INACTIVE
    PENDING_RESTORATION_REDEMPTION_MOCK
    PENDING_RETRY_EPP_CREATE
    PENDING_RETRY_HELD
    PENDING_SEND_AUTH_CODE
    PENDING_SETUP
    PENDING_SETUP_ABANDON
    PENDING_SETUP_AGREEMENT_LANDRUSH
    PENDING_SETUP_AGREEMENT_SUNRISE2_A
    PENDING_SETUP_AGREEMENT_SUNRISE2_B
    PENDING_SETUP_AGREEMENT_SUNRISE2_C
    PENDING_SETUP_AUTH
    PENDING_SETUP_DNS
    PENDING_SETUP_FAILED
    PENDING_SETUP_REVIEW
    PENDING_SETUP_SUNRISE
    PENDING_SETUP_SUNRISE_PRE
    PENDING_SETUP_SUNRISE_RESPONSE
    PENDING_SUBMIT_FAILURE
    PENDING_SUBMIT_FIREHOSE
    PENDING_SUBMIT_HOLD_FIREHOSE
    PENDING_SUBMIT_HOLD_LANDRUSH
    PENDING_SUBMIT_HOLD_SUNRISE
    PENDING_SUBMIT_LANDRUSH
    PENDING_SUBMIT_RESPONSE_FIREHOSE
    PENDING_SUBMIT_RESPONSE_LANDRUSH
    PENDING_SUBMIT_RESPONSE_SUNRISE
    PENDING_SUBMIT_SUCCESS_FIREHOSE
    PENDING_SUBMIT_SUCCESS_LANDRUSH
    PENDING_SUBMIT_SUCCESS_SUNRISE
    PENDING_SUBMIT_SUNRISE
    PENDING_SUBMIT_WAITING_LANDRUSH
    PENDING_SUCCESS_PRE_REGISTRATION
    PENDING_SUSPENDED_DATA_QUALITY
    PENDING_TRANSFER_ACK_PREMIUM
    PENDING_TRANSFER_IN
    PENDING_TRANSFER_IN_ACK
    PENDING_TRANSFER_IN_ACK_PREMIUM
    PENDING_TRANSFER_IN_BAD_REGISTRANT
    PENDING_TRANSFER_IN_CANCEL
    PENDING_TRANSFER_IN_CANCEL_REGISTRY
    PENDING_TRANSFER_IN_COMPLETE_ACK
    PENDING_TRANSFER_IN_DELETE
    PENDING_TRANSFER_IN_LOCK
    PENDING_TRANSFER_IN_NACK
    PENDING_TRANSFER_IN_NOTIFICATION
    PENDING_TRANSFER_IN_PREMIUM
    PENDING_TRANSFER_IN_RELEASE
    PENDING_TRANSFER_IN_RESPONSE
    PENDING_TRANSFER_IN_UNDERAGE
    PENDING_TRANSFER_OUT
    PENDING_TRANSFER_OUT_ACK
    PENDING_TRANSFER_OUT_NACK
    PENDING_TRANSFER_OUT_PREMIUM
    PENDING_TRANSFER_OUT_UNDERAGE
    PENDING_TRANSFER_OUT_VALIDATION
    PENDING_TRANSFER_PREMIUM
    PENDING_TRANSFER_PREMUIM
    PENDING_TRANSFER_SUBMIT_PREMIUM
    PENDING_UNLOCK_DATA_QUALITY
    PENDING_UNLOCK_PREMIUM
    PENDING_UPDATE
    PENDING_UPDATED_REGISTRANT_DATA_QUALITY
    PENDING_UPDATE_ACCOUNT
    PENDING_UPDATE_API
    PENDING_UPDATE_API_RESPONSE
    PENDING_UPDATE_AUTH
    PENDING_UPDATE_CONTACTS
    PENDING_UPDATE_CONTACTS_PRIVACY
    PENDING_UPDATE_DNS
    PENDING_UPDATE_DNS_SECURITY
    PENDING_UPDATE_ELIGIBILITY
    PENDING_UPDATE_EPP_CONTACTS
    PENDING_UPDATE_MEMBERSHIP
    PENDING_UPDATE_OWNERSHIP
    PENDING_UPDATE_OWNERSHIP_AUTH_AUCTION
    PENDING_UPDATE_OWNERSHIP_HELD
    PENDING_UPDATE_REGISTRANT
    PENDING_UPDATE_REPO
    PENDING_VALIDATION_DATA_QUALITY
    PENDING_VERIFICATION_FRAUD
    PENDING_VERIFICATION_STATUS
    PENDING_VERIFY_REGISTRANT_DATA_QUALITY
    RESERVED
    RESERVED_PREMIUM
    REVERTED
    SUSPENDED_VERIFICATION_ICANN
    TRANSFERRED_OUT
    UNLOCKED_ABUSE
    UNLOCKED_SUPER
    UNPARKED_AND_UNHELD
    UPDATED_OWNERSHIP
    UPDATED_OWNERSHIP_HELD
  }

  enum DomainStatusGroups {
    INACTIVE
    PRE_REGISTRATION
    REDEMPTION
    RENEWABLE
    VERIFICATION_ICANN
    VISIBLE
  }

  enum DomainIncludes {
    authCode
    contacts
    nameServers
  }

  type AddressMailing {
    address1: String
    address2: String
    city: String
    country: String
    postalCode: String
    state: String
  }

  type Contact {
    email: String
    fax: String
    jobTitle: String
    nameFirst: String
    nameLast: String
    nameMiddle: String
    organization: String
    phone: String
    addressMailing: AddressMailing
  }

  type Domain {
    authCode: String
    createdAt: String
    deletedAt: String
    transferAwayEligibleAt: String
    domain: String
    domainId: Int
    expirationProtected: Boolean
    expires: String
    exposeWhois: Boolean
    holdRegistrar: Boolean
    locked: Boolean
    privacy: Boolean
    registrarCreatedAt: String
    renewAuto: Boolean
    renewDeadline: String
    renewable: Boolean
    status: String
    transferProtected: Boolean
    nameServers: [String]
    contactTech: Contact
    contactRegistrant: Contact
    contactBilling: Contact
    contactAdmin: Contact
  }

  type DomainAgreement {
    agreementKey: String
    content: String
    title: String
    url: String
  }

  enum DomainAvailabilityCheckType {
    FAST
    FULL
  }

  type DomainAvailabilityResponse {
    available: Boolean
    currency: String
    definative: Boolean
    domain: String
    period: Int
    price: Float
  }

  enum TLDType{
    GENERIC
    COUNTRY_CODE
  }
  type SupportedTLD {
    name: String
    type: TLDType
  }
`

module.exports = typeDefs
