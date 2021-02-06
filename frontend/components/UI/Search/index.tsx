import React, { memo } from "react";
import { useRouter } from "next/router";
import { Formik, Form, FormikProps } from "formik";
import { Wrapper, Inner, Button } from "./styles";
import { Input } from "../Input";
import { getAsString } from "@/utils/getAsString";

export interface SearchFormValues {
  text: string;
}

interface SearchProps {}

const SearchComponent = ({}: SearchProps) => {
  const { push, query, pathname } = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{
          text: getAsString(query.search) ?? "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          let queryParams = {};
          if (query.categories) {
            queryParams = { ...queryParams, categories: query.categories };
          }
          if (query.requirenments) {
            queryParams = {
              ...queryParams,
              requirenments: query.requirenments,
            };
          }
          if (query.rate) {
            queryParams = {
              ...queryParams,
              rate: true,
            };
          }
          if (values.text) {
            queryParams = {
              ...queryParams,
              search: values.text,
            };
          }
          push(
            {
              pathname,
              query: queryParams,
            },
            undefined,
            { shallow: true }
          );
          setSubmitting(false);
        }}
      >
        {({}: FormikProps<SearchFormValues>) => (
          <Form>
            <Inner>
              <Input type="text" name="text" placeholder="Поиск" />
              <Button type="submit">
                <img src="/search.svg" alt="Search" />
              </Button>
            </Inner>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export const Search = memo(SearchComponent);
