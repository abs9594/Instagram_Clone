from passlib.context import CryptContext


class Hash:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    @classmethod
    def encrypt(cls, plain_password: str) -> str:
        return cls.pwd_context.hash(plain_password)

    @classmethod
    def verify(cls, plain_password: str, hashed_password: str) -> bool:
        return cls.pwd_context.verify(plain_password, hashed_password)
