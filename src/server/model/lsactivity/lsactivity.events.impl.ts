import {LSActivityEvents as LSActivityEvents} from "./lsactivity.events.definition"

export class LSActivityEventsImpl implements LSActivityEvents {
    AccountCreated: number;
    AccountVerified: number;
    Profiling: number;
    PendingSubmission: number;
    UnderReview: number;
    ComplianceMismatch: number;
    UnderProcess: number;
    AccountActivated: number;
    ProfileReviewed: number;

    constructor() {
        if (process.env.NODE_ENV === "DEVELOPMENT") {
            this.AccountCreated = 219;
            this.AccountVerified = 224;
            this.Profiling = 225;
            this.PendingSubmission = 226;
            this.UnderReview = 227;
            this.ComplianceMismatch = 228;
            this.UnderProcess = 229;
            this.AccountActivated = 0;
            this.ProfileReviewed = 230;
        }
        else {
            this.AccountCreated = 229;
            this.AccountVerified = 230;
            this.Profiling = 231;
            this.PendingSubmission = 232;
            this.UnderReview = 233;
            this.ComplianceMismatch = 234;
            this.UnderProcess = 235;
            this.AccountActivated = 0;
            this.ProfileReviewed = 236;
        }
    }
}