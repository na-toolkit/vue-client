export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  UnixDate: number;
};

export type Account = {
  __typename?: 'Account';
  /** 用戶帳號 */
  account: Scalars['String'];
  /** UID */
  accountUid: Scalars['String'];
  /** 用戶暱稱 */
  name: Scalars['String'];
  /** 用戶頭像 */
  profile: Scalars['String'];
  status: AccountStatus;
};

export enum AccountStatus {
  /** 凍結  */
  Frozen = 'Frozen',
  None = 'None',
  /** 正常 */
  Normal = 'Normal',
  /** 待驗證 */
  Verify = 'Verify'
}

export type CreateAccountInput = {
  /** 用戶帳號 */
  account: Scalars['String'];
  /** 邀請碼 */
  code: Scalars['String'];
  /** 用戶暱稱 */
  name: Scalars['String'];
  /** 用戶密碼 */
  passwordInput: Scalars['String'];
};

export type CreateSentenceInput = {
  /** 內容 */
  content: Scalars['String'];
  /** 備註 */
  note?: InputMaybe<Scalars['String']>;
  /** 對應翻譯 */
  translation?: InputMaybe<Scalars['String']>;
};

export type JwtSign = {
  __typename?: 'JwtSign';
  /** token */
  accessToken: Scalars['String'];
  /** 有效時間 */
  expiresIn: Scalars['UnixDate'];
};

export type LoginInput = {
  /** 帳號名稱 */
  account: Scalars['String'];
  /** 帳號密碼 */
  passwordInput: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSentence: Sentence;
  login: JwtSign;
  /** 註冊帳號 */
  register: Scalars['Boolean'];
  removeSentence: Scalars['Boolean'];
  /** 更新帳號信息 */
  updateAccount: Scalars['Boolean'];
  updateSentence: Scalars['Boolean'];
};


export type MutationCreateSentenceArgs = {
  input: CreateSentenceInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: CreateAccountInput;
};


export type MutationRemoveSentenceArgs = {
  sentenceUid: Scalars['String'];
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


export type MutationUpdateSentenceArgs = {
  input: UpdateSentenceInput;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  /** 當前頁數 */
  currentPage: Scalars['Int'];
  /** 取得資料數 */
  pageSize: Scalars['Int'];
  /** 資料總筆數 */
  total: Scalars['Int'];
};

export type PaginationInput = {
  /** 當前頁數 */
  currentPage: Scalars['Int'];
  /** 取得資料數 */
  pageSize: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getSentence: Sentence;
  getSentenceList: SentenceWithPagination;
  hello: Scalars['String'];
  /** 獲取當前登入帳號信息 */
  whoami: Account;
};


export type QueryGetSentenceArgs = {
  sentenceUid: Scalars['ID'];
};


export type QueryGetSentenceListArgs = {
  input: SearchSentenceWithPaginationInput;
};

export type SearchSentenceWithPaginationInput = {
  /** 分頁資訊 */
  paginationInfo: PaginationInput;
};

export type Sentence = {
  __typename?: 'Sentence';
  /** 內容 */
  content: Scalars['String'];
  /** 備註 */
  note: Scalars['String'];
  /** UID */
  sentenceUid: Scalars['String'];
  /** 對應翻譯 */
  translation: Scalars['String'];
};

export type SentenceInList = {
  __typename?: 'SentenceInList';
  /** 內容 */
  content: Scalars['String'];
  /** 備註 */
  note: Scalars['String'];
  /** UID */
  sentenceUid: Scalars['String'];
  /** 對應翻譯 */
  translation: Scalars['String'];
};

export type SentenceWithPagination = {
  __typename?: 'SentenceWithPagination';
  data: Array<SentenceInList>;
  /** 分頁資訊 */
  paginationInfo: PaginationInfo;
};

export type UpdateAccountInput = {
  /** 用戶暱稱 */
  name?: InputMaybe<Scalars['String']>;
  /** 用戶頭像 */
  profile: Scalars['String'];
};

export type UpdateSentenceInput = {
  /** 內容 */
  content?: InputMaybe<Scalars['String']>;
  /** 備註 */
  note?: InputMaybe<Scalars['String']>;
  sentenceUid: Scalars['ID'];
  /** 對應翻譯 */
  translation?: InputMaybe<Scalars['String']>;
};
