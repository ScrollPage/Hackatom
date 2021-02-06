import React, { memo } from "react";
import { Wrapper } from "./styles";
import Image from "next/image";
import Link from "next/link";

interface AvatarProps {
  size?: number;
  src?: string;
  href?: string;
}

const AvatarComponent: React.FC<AvatarProps> = ({ size = 40, src, href }) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <a>
            <Wrapper size={size}>
              {src && (
                <Image src={src} height={size} width={size} alt="Avatar" />
              )}
            </Wrapper>
          </a>
        </Link>
      ) : (
        <Wrapper size={size}>
          {src && <Image src={src} height={size} width={size} alt="Avatar" />}
        </Wrapper>
      )}
    </>
  );
};

export const Avatar = memo(AvatarComponent);
