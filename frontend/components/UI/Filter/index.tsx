import React, { memo } from "react";
import { Formik, Form, FormikProps } from "formik";
import { Wrapper, Inner, Title } from "./styles";
import { Button } from "../Button";
import { Select } from "../Select";
import { useRouter } from "next/router";
import { getAsString } from "@/utils/getAsString";
import { Checkbox } from "antd";

interface FilterProps {}

interface FiliterFormValues {
  categories: number[];
  requirenments: number[];
  isRating: boolean;
}

const FilterComponent: React.FC<FilterProps> = ({}) => {
  const { push, query, pathname } = useRouter();

  return (
    <Wrapper>
      <Title>Фильтры</Title>
      <Formik
        initialValues={{
          categories:
            getAsString(query.categories)
              ?.split(",")
              .map((item) => Number(item)) ?? [],
          requirenments:
            getAsString(query.requirenments)
              ?.split(",")
              .map((item) => Number(item)) ?? [],
          isRating: !!getAsString(query.rate),
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          let queryParams = {};
          if (values.categories.length !== 0) {
            queryParams = {
              ...queryParams,
              categories: values.categories.join(","),
            };
          }
          if (values.requirenments.length !== 0) {
            queryParams = {
              ...queryParams,
              requirenments: values.requirenments.join(","),
            };
          }
          if (values.isRating) {
            queryParams = {
              ...queryParams,
              rate: true,
            };
          }
          if (query.search) {
            queryParams = {
              ...queryParams,
              search: getAsString(query.search),
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
        {({ setFieldValue, values }: FormikProps<FiliterFormValues>) => (
          <Form>
            <Inner>
              <Checkbox
                value={values.isRating}
                onChange={(e) => setFieldValue("isRating", e.target.checked)}
              >
                По рейтингу
              </Checkbox>
              <Select
                width="100%"
                name="categories"
                placeholder="Категории"
                value={values.categories}
                onChange={setFieldValue}
              />
              <Select
                width="100%"
                name="requirenments"
                placeholder="Потребности"
                value={values.requirenments}
                onChange={setFieldValue}
              />
              <Button myType="blue" type="submit" width="100%">
                Применить
              </Button>
            </Inner>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export const Filter = memo(FilterComponent);
